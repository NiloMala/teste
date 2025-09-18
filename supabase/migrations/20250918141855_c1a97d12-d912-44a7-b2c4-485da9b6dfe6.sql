-- Create organizations table
CREATE TABLE public.organizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE UNIQUE,
  organization_id UUID NOT NULL REFERENCES public.organizations ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'viewer',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create instances table
CREATE TABLE public.instances (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES public.organizations ON DELETE CASCADE,
  name TEXT NOT NULL,
  evolution_instance_id TEXT NOT NULL,
  auth_token TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'inactive',
  webhook_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create flows table
CREATE TABLE public.flows (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES public.organizations ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  current_version_id UUID,
  created_by UUID NOT NULL REFERENCES public.profiles ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create flow_versions table
CREATE TABLE public.flow_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  flow_id UUID NOT NULL REFERENCES public.flows ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  flow_json JSONB NOT NULL,
  metadata JSONB DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_by UUID NOT NULL REFERENCES public.profiles ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create messages_log table
CREATE TABLE public.messages_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  instance_id UUID NOT NULL REFERENCES public.instances ON DELETE CASCADE,
  flow_version_id UUID REFERENCES public.flow_versions ON DELETE SET NULL,
  direction TEXT NOT NULL, -- 'inbound' or 'outbound'
  from_number TEXT,
  to_number TEXT,
  message_type TEXT NOT NULL, -- 'text', 'image', 'audio', 'document', etc.
  content JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'sent', 'delivered', 'failed'
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flow_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for organizations
CREATE POLICY "Users can view their organization" 
ON public.organizations 
FOR SELECT 
USING (id IN (SELECT organization_id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Organization owners can update their organization" 
ON public.organizations 
FOR UPDATE 
USING (id IN (SELECT organization_id FROM public.profiles WHERE user_id = auth.uid() AND role IN ('owner', 'admin')));

-- RLS Policies for profiles
CREATE POLICY "Users can view profiles in their organization" 
ON public.profiles 
FOR SELECT 
USING (organization_id IN (SELECT organization_id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (user_id = auth.uid());

-- RLS Policies for instances
CREATE POLICY "Users can view instances in their organization" 
ON public.instances 
FOR SELECT 
USING (organization_id IN (SELECT organization_id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage instances in their organization" 
ON public.instances 
FOR ALL 
USING (organization_id IN (SELECT organization_id FROM public.profiles WHERE user_id = auth.uid() AND role IN ('owner', 'admin', 'editor')));

-- RLS Policies for flows
CREATE POLICY "Users can view flows in their organization" 
ON public.flows 
FOR SELECT 
USING (organization_id IN (SELECT organization_id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Editors can manage flows in their organization" 
ON public.flows 
FOR ALL 
USING (organization_id IN (SELECT organization_id FROM public.profiles WHERE user_id = auth.uid() AND role IN ('owner', 'admin', 'editor')));

-- RLS Policies for flow_versions
CREATE POLICY "Users can view flow versions in their organization" 
ON public.flow_versions 
FOR SELECT 
USING (flow_id IN (SELECT id FROM public.flows WHERE organization_id IN (SELECT organization_id FROM public.profiles WHERE user_id = auth.uid())));

CREATE POLICY "Editors can manage flow versions in their organization" 
ON public.flow_versions 
FOR ALL 
USING (flow_id IN (SELECT id FROM public.flows WHERE organization_id IN (SELECT organization_id FROM public.profiles WHERE user_id = auth.uid() AND role IN ('owner', 'admin', 'editor'))));

-- RLS Policies for messages_log
CREATE POLICY "Users can view messages in their organization" 
ON public.messages_log 
FOR SELECT 
USING (instance_id IN (SELECT id FROM public.instances WHERE organization_id IN (SELECT organization_id FROM public.profiles WHERE user_id = auth.uid())));

-- Add foreign key constraint for current_version_id after flow_versions table is created
ALTER TABLE public.flows 
ADD CONSTRAINT flows_current_version_id_fkey 
FOREIGN KEY (current_version_id) REFERENCES public.flow_versions(id);

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_profiles_organization_id ON public.profiles(organization_id);
CREATE INDEX idx_instances_organization_id ON public.instances(organization_id);
CREATE INDEX idx_flows_organization_id ON public.flows(organization_id);
CREATE INDEX idx_flow_versions_flow_id ON public.flow_versions(flow_id);
CREATE INDEX idx_messages_log_instance_id ON public.messages_log(instance_id);
CREATE INDEX idx_messages_log_created_at ON public.messages_log(created_at);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_organizations_updated_at
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_instances_updated_at
  BEFORE UPDATE ON public.instances
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_flows_updated_at
  BEFORE UPDATE ON public.flows
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  org_id UUID;
BEGIN
  -- Create a new organization for the user (they become the owner)
  INSERT INTO public.organizations (name, plan)
  VALUES (COALESCE(NEW.raw_user_meta_data ->> 'organization_name', 'My Organization'), 'free')
  RETURNING id INTO org_id;
  
  -- Create the user profile
  INSERT INTO public.profiles (user_id, organization_id, email, role)
  VALUES (NEW.id, org_id, NEW.email, 'owner');
  
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
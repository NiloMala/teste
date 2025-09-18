// Vercel Serverless Function: /api/evolution-create-instance.js
// Coloque seu token Evolution API em Vercel > Settings > Environment Variables

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { instanceName } = req.body;
  if (!instanceName) {
    return res.status(400).json({ error: 'Nome da instância é obrigatório' });
  }

  const EVOLUTION_API_TOKEN = process.env.EVOLUTION_API_TOKEN;
  const EVOLUTION_API_URL = 'https://evo.auroratech.tech/manager/sessions/start-session';
  const QR_API_URL = 'https://evo.auroratech.tech/manager/sessions/qr-code';

  try {
    // Basic runtime checks
    if (!EVOLUTION_API_TOKEN) {
      console.error('EVOLUTION_API_TOKEN is not set in environment');
      return res.status(500).json({ error: 'Server misconfiguration: missing EVOLUTION_API_TOKEN' });
    }
    console.log('Creating evolution instance, sessionName=', instanceName);
    // Cria a instância na Evolution API
    const createResp = await fetch(EVOLUTION_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${EVOLUTION_API_TOKEN}`,
      },
      body: JSON.stringify({
        sessionName: instanceName,
        events: ["webhook", "base64", "MESSAGE_UPSERT"]
      })
    });
    if (!createResp.ok) {
      const errText = await createResp.text();
      console.error('create session failed', createResp.status, errText);
      return res.status(500).json({ error: 'Erro ao criar instância', status: createResp.status, details: errText });
    }
    // Busca o QR code
    const qrResp = await fetch(`${QR_API_URL}?sessionName=${instanceName}`, {
      headers: {
        'Authorization': `Bearer ${EVOLUTION_API_TOKEN}`,
      }
    });
    if (!qrResp.ok) {
      const errText = await qrResp.text();
      console.error('fetch qr failed', qrResp.status, errText);
      return res.status(500).json({ error: 'Erro ao buscar QR code', status: qrResp.status, details: errText });
    }
    const qrData = await qrResp.json();
    console.log('QR data received:', Object.keys(qrData || {}));
    return res.status(200).json({ qr: qrData.qr || qrData.data || qrData, instanceName });
  } catch (e) {
    console.error('Unexpected error in evolution-create-instance:', e);
    return res.status(500).json({ error: 'Erro inesperado', details: String(e) });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};

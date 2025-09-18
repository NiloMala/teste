// API helper para Evolution API
export async function createEvolutionInstance({ instanceName, instanceId }) {
  const url = "https://evo.auroratech.tech/manager/sessions/start-session";
  const body = {
    sessionName: instanceId,
    events: [
      "webhook",
      "base64",
      "MESSAGE_UPSERT"
    ]
    // Adicione outros campos se necessário
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer c844dbc243884b4eded9ec69b449ed3b"
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) throw new Error("Erro ao criar instância Evolution API");
  return response.json();
}

export async function getQRCode(instanceId) {
  const url = `https://evo.auroratech.tech/manager/sessions/qr-code?sessionName=${instanceId}`;
  const response = await fetch(url, {
    headers: {
      "Authorization": "Bearer c844dbc243884b4eded9ec69b449ed3b"
    }
  });
  if (!response.ok) throw new Error("Erro ao buscar QR code");
  return response.json();
}

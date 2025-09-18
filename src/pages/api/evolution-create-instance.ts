import type { NextApiRequest, NextApiResponse } from 'next';

// NÃO exponha esse token no frontend!
const EVOLUTION_API_TOKEN = process.env.EVOLUTION_API_TOKEN || 'COLOQUE_O_TOKEN_AQUI';
const EVOLUTION_API_URL = 'https://evo.auroratech.tech/manager/sessions/start-session';
const QR_API_URL = 'https://evo.auroratech.tech/manager/sessions/qr-code';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { instanceName } = req.body;
  if (!instanceName) {
    return res.status(400).json({ error: 'Nome da instância é obrigatório' });
  }

  try {
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
      const err = await createResp.text();
      return res.status(500).json({ error: 'Erro ao criar instância', details: err });
    }

    // Busca o QR code
    const qrResp = await fetch(`${QR_API_URL}?sessionName=${instanceName}`, {
      headers: {
        'Authorization': `Bearer ${EVOLUTION_API_TOKEN}`,
      }
    });
    if (!qrResp.ok) {
      const err = await qrResp.text();
      return res.status(500).json({ error: 'Erro ao buscar QR code', details: err });
    }
    const qrData = await qrResp.json();

    return res.status(200).json({ qr: qrData.qr, instanceName });
  } catch (e) {
    return res.status(500).json({ error: 'Erro inesperado', details: String(e) });
  }
}

// Dados oficiais informados pela Blokasa (28/09/2026). Substituem os textos fictícios do Figma.
export const company = {
  name: 'Blokasa',
  legalName: 'Blokasa Pisos Intertravados',
  address: {
    street: 'Av. da Aclimação, 73',
    district: 'Aclimação',
    city: 'São Paulo',
    state: 'SP',
    zip: '09172-030',
  },
  phone: { display: '(11) 3438-9835', href: 'tel:+551134389835' },
  whatsapp: {
    display: '(11) 94778-5624',
    href: 'https://wa.me/5511947785624',
  },
  emails: ['contato@blokasa.com.br', 'blokasapisos@gmail.com'],
} as const

export const fullAddress = `${company.address.street} - ${company.address.district}, ${company.address.city} - ${company.address.state}, ${company.address.zip}`

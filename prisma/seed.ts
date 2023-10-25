import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Canon EOS 50D',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e57',
      name: 'Canon EOS 5D',
      price: 5000,
      description: 'Professional camera, solid build',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
      name: 'Canon R',
      price: 3000,
      description: 'Professional camera, new technology',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17259',
      name: 'Nikon D50',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
      name: 'Leica q2',
      price: 5000,
      description: 'Small, compact, innovative',
    },
  ];
}

function getOrders() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
      clientId: '5e7e96f8-fa58-46dc-98e1-f58be5ec56f9',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17261',
      clientId: '449393b6-78d1-4b31-9590-1b38d2ecd6c3',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17259',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17262',
      clientId: 'e11b3b27-9170-4af1-a358-80f9785957d4',
      productId: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
    },
  ];
}

function getClients() {
  return [
    {
      id: '5e7e96f8-fa58-46dc-98e1-f58be5ec56f9',
      name: 'Marco Polo',
      address: '123 Main Street, London',
    },
    {
      id: '449393b6-78d1-4b31-9590-1b38d2ecd6c3',
      name: 'Staszek Paleta',
      address: 'Kredkowa 11, Jastarnia',
    },
    {
      id: 'a0796a0b-c160-4058-a88d-7e9a2c72ae24',
      name: 'Africa Engineer',
      address: 'MigrationToParis Street 69',
    },
    {
      id: 'e11b3b27-9170-4af1-a358-80f9785957d4',
      name: 'Johny Silverhand',
      address: 'Afterlife lower deck, NightCity',
    },
  ];
}
async function clearDatabase() {
  await db.product.deleteMany({});
  await db.client.deleteMany({});
  await db.order.deleteMany({});
}

async function seed() {
  await clearDatabase();

  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    }),
  );

  await Promise.all(
    getClients().map((client) => {
      return db.client.create({ data: client });
    }),
  );

  await Promise.all(
    getOrders().map(({ productId, clientId, ...orderData }) => {
      return db.order.create({
        data: {
          ...orderData,
          product: {
            connect: { id: productId },
          },
          client: {
            connect: { id: clientId },
          },
        },
      });
    }),
  );
}

seed();

# Elevate Node — Monorepo

Plataforma SaaS de agendamiento y gestión para negocios de belleza y bienestar.

## Apps

| App | URL | Descripción |
|---|---|---|
| `elevate-b2c` | https://elevate-b2c.vercel.app | App del cliente final — Marketplace de negocios |
| `elevate-b2b` | https://elevate-b2b-nine.vercel.app | Dashboard del socio — Cockpit de operación |

## Estructura

```
elevate-node/
├── apps/
│   ├── elevate-b2c/   ← App cliente (React + Vite + Tailwind)
│   └── elevate-b2b/   ← Dashboard socio (React + Vite + Tailwind)
├── packages/
│   └── shared/        ← Tipos TypeScript compartidos
└── supabase/
    └── schema.sql     ← Esquema de base de datos
```

## Desarrollo local

```bash
# App cliente (B2C) — puerto 3001
cd apps/elevate-b2c
npm install
npm run dev

# Dashboard socio (B2B) — puerto 3002
cd apps/elevate-b2b
npm install
npm run dev
```

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Supabase (auth + base de datos)
- Vercel (hosting independiente por app)
- Stripe (pagos en el flujo de agenda)

---

ELEVATE NODE | PLATAFORMA TECH PARA BARBERÍAS | www.elevatenode.com

# Portfólio · Kauê Andrade

Portfólio com tema espacial e visual de DevOps, feito em HTML, CSS e JavaScript (módulos ES), sem framework.

## Seções

1. Abertura: nome, subtítulo "Portfólio" e links.
2. Experiência: cartões da Comtele e da UNIP, com logos, descrição e tecnologias.
3. Tecnologias: cartões filtráveis por categoria.
4. Perfil: prévia do LinkedIn com foto, banner, cargo e instituições.
5. Contato: e-mail com botão de copiar, LinkedIn e GitHub.

## Estrutura

```
portfolio/
├─ index.html
├─ assets/  avatar.png  icons/*.svg (Devicon)
├─ css/
│  ├─ tokens.css       cores, fontes, raios, easing
│  ├─ base.css         reset e tipografia
│  ├─ components.css   botões, status, vidro, abas, cursor
│  ├─ sections.css     abertura, experiência, stack, rodapé
│  └─ effects.css      fundo espacial, revelação no scroll, keyframes
└─ js/
   ├─ data.js          todo o conteúdo (edite aqui)
   ├─ main.js          inicializa os módulos
   └─ modules/
      ├─ render.js       monta o HTML e as abas de tecnologias
      ├─ space.js        estrelas, parallax, estrelas cadentes, ping no clique
      ├─ motion.js       luz no nome, deslocamento da abertura, planeta
      ├─ interactions.js cartões 3D, botões magnéticos, revelação
      ├─ cursor.js       cursor personalizado
      └─ toast.js
```

## Rodar localmente

```
npx serve .
```

## Publicar no seu domínio (Cloudflare Pages)

1. Crie um repositório no GitHub (ex.: `kaueandradev/portfolio`) e envie esta pasta:
   ```
   git init
   git add .
   git commit -m "Portfólio"
   git branch -M main
   git remote add origin https://github.com/kaueandradev/portfolio.git
   git push -u origin main
   ```
2. No painel da Cloudflare: Workers e Pages > Criar > Pages > Conectar ao Git > escolha o repositório.
3. Configuração do build:
   - Comando de build: `bash build.sh`
   - Pasta de saída: `dist`
   - Variável de ambiente: `SITE_URL` = `https://seudominio.com.br`
4. Depois do primeiro deploy: projeto > Domínios personalizados > Configurar domínio > digite o seu domínio.
   Como o domínio já está na Cloudflare, o DNS é criado sozinho e o HTTPS sai em poucos minutos.
5. A cada `git push` na `main`, o site é publicado de novo automaticamente.

O `build.sh` adiciona ao `index.html` o doctype, o charset, as tags de prévia do link
(`assets/og.png`) e um arquivo `_headers` com cabeçalhos de segurança e cache.

#!/usr/bin/env bash
# Gera a pasta dist/ pronta para o Cloudflare Pages.
# O index.html do projeto é um fragmento (o preview no Claude adiciona o <head>),
# então aqui ele recebe doctype, charset, viewport e as tags de prévia do link.
#
# Uso local:        SITE_URL=https://seudominio.com.br bash build.sh
# No Cloudflare:    comando de build "bash build.sh", pasta de saída "dist",
#                   variável de ambiente SITE_URL com o seu domínio.
set -euo pipefail

SITE_URL="${SITE_URL:-https://kaue.work}"
SITE_URL="${SITE_URL%/}"
TITLE="Kauê Andrade | Analista DevOps"
DESC="DevOps, redes e infraestrutura. Trabalhando na Comtele e cursando Análise e Desenvolvimento de Sistemas."

rm -rf dist
mkdir -p dist
cp -r assets css js dist/

{
  cat <<EOF
<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#030616">
<link rel="canonical" href="${SITE_URL}/">
<link rel="icon" href="/assets/avatar-face.png">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:url" content="${SITE_URL}/">
<meta property="og:title" content="${TITLE}">
<meta property="og:description" content="${DESC}">
<meta property="og:image" content="${SITE_URL}/assets/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${TITLE}">
<meta name="twitter:description" content="${DESC}">
<meta name="twitter:image" content="${SITE_URL}/assets/og.png">
EOF
  cat index.html
  printf '\n</html>\n'
} > dist/index.html

# Cabeçalhos de segurança e cache servidos pelo Cloudflare Pages.
cat > dist/_headers <<'EOF'
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/assets/*
  Cache-Control: public, max-age=604800

/css/*
  Cache-Control: public, max-age=3600

/js/*
  Cache-Control: public, max-age=3600
EOF

echo "dist/ gerado para ${SITE_URL}"

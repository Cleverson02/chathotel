# 📋 Alterações de Contato & Empresas — Chat Hotel v1.0.1

**Data:** Maio de 2026  
**Tipo:** Atualização de informações de contato e parceiros

---

## 🔄 Alterações Realizadas

### 1. Informações de Contato ✅

**ANTES:**
```
Email: contato@chathotel.com.br
Telefone: +55 11 4000-0000
Local: São Paulo · BR
```

**DEPOIS:**
```
Email: chathotel@elevare.tur.br
Telefones: 
  • +55 41 992756768 (celular)
  • +55 41 3301-3600 (comercial)
Local: Curitiba · BR
```

**Onde foi alterado:**
- ✅ Footer → Seção Contato (offer-cta-footer.jsx)
- ✅ Email agora é clicável (mailto:)

---

### 2. Nome da Empresa CleverIA ✅

**ANTES:**
- "Cleveri" (incompleto)
- Sem link

**DEPOIS:**
- "CleverIA" (nome correto)
- Link: https://www.cleveria.com.br/

**Onde foi alterado:**
- ✅ hero.jsx linha 238 (stats)
- ✅ offer-cta-footer.jsx linha 294 (descrição)
- ✅ offer-cta-footer.jsx linha 305 (footer items)

---

### 3. Links para Parceiros ✅

**RVS - Grupo de Hotéis**
- ✅ Link: https://rvshoteis.com.br/
- ✅ Abre em nova aba (_blank)
- ✅ Localizado em: offer-cta-footer.jsx (descrição + footer)

**CleverIA - Parceiro Técnico**
- ✅ Link: https://www.cleveria.com.br/
- ✅ Abre em nova aba (_blank)
- ✅ Localizado em: offer-cta-footer.jsx (descrição + footer)

---

## 📝 Arquivos Modificados

```
✏️ hero.jsx
   • Linha 238: "cleveri" → "CleverIA"

✏️ offer-cta-footer.jsx
   • Linhas 292-295: Adicionados links para RVS e CleverIA
   • Linha 305: "Cleveri" → "CleverIA"
   • Linhas 303-316: Refatorado para suportar links em itens de contato
   • Contato agora com:
     - chathotel@elevare.tur.br (link mailto:)
     - +55 41 992756768
     - +55 41 3301-3600
     - Curitiba · BR
```

---

## 🎯 Impacto Visual

### Footer - Antes
```
Contato
  contato@chathotel.com.br
  +55 11 4000-0000
  São Paulo · BR
```

### Footer - Depois
```
Contato
  chathotel@elevare.tur.br ← clicável (abre email)
  +55 41 992756768        ← telefone 1
  +55 41 3301-3600        ← telefone 2
  Curitiba · BR           ← local
```

### Descrição de Empresa - Antes
```
Chat Hotel é um produto ELEVARE Turismo, empresa do Grupo RVS (quase 30 anos de hotelaria),
em parceria técnica com a Cleveri (20 anos de mercado).
```

### Descrição de Empresa - Depois
```
Chat Hotel é um produto ELEVARE Turismo, empresa do [Grupo RVS] (quase 30 anos de hotelaria),
em parceria técnica com a [CleverIA] (20 anos de mercado).
[links destacados em cor brand com underline]
```

---

## 🔗 Links Configurados

| Empresa | Link | Onde Aparece |
|---------|------|--------------|
| **Grupo RVS** | https://rvshoteis.com.br/ | Description + Footer items |
| **CleverIA** | https://www.cleveria.com.br/ | Description + Footer items |

---

## ✨ Funcionalidades Adicionadas

### Email Clicável
```html
<a href="mailto:chathotel@elevare.tur.br">chathotel@elevare.tur.br</a>
```
→ Clique abre cliente de email padrão

### Links em Nova Aba
```html
<a href="url" target="_blank" rel="noopener noreferrer">Texto</a>
```
→ Abre em nova aba sem fechar página

### Cores de Link
- Cor padrão (sem link): `var(--fg)` (branco/cinza)
- Cor com link: `var(--brand)` (dourado/cor selecionada)
- Efeito hover: `link-shimmer` (underline animado)

---

## 🧪 Como Testar

### Localmente
```bash
npm run dev
# Abra: http://localhost:3000

# Vá para o footer
# Clique em: chathotel@elevare.tur.br
# → Deve abrir cliente de email

# Clique em: Grupo RVS ou CleverIA
# → Deve abrir site em nova aba
```

### Após Deploy
```
https://chathotel.elevare.tur.br

# Mesmo teste acima
# Deve funcionar em produção
```

---

## 📱 Responsividade

As alterações mantêm responsividade em:
- ✅ Desktop (1440px)
- ✅ Tablet (768px)
- ✅ Mobile (375px)

Links ficam clicáveis em todos os tamanhos.

---

## 🚀 Deploy

Nenhuma configuração adicional necessária!

- Não há mudanças em `vercel.json`
- Não há mudanças em variáveis de ambiente
- Apenas alterações visuais/links

**Próximo deploy:** Execute `git push` normalmente

---

## ✅ Checklist de Verificação

- [x] Email atualizado para chathotel@elevare.tur.br
- [x] Telefones atualizados para Curitiba
- [x] "Cleveri" corrigido para "CleverIA" em todos os locais
- [x] Links adicionados para RVS (https://rvshoteis.com.br/)
- [x] Links adicionados para CleverIA (https://www.cleveria.com.br/)
- [x] Email é clicável (mailto:)
- [x] Links abrem em nova aba
- [x] Cores dos links corretas
- [x] Responsividade mantida
- [x] Documentação atualizada

---

## 📌 Notas

1. **Email:** Agora quando alguém clica em `chathotel@elevare.tur.br`, abre o cliente de email padrão do navegador com o destinatário pré-preenchido.

2. **Telefones:** Ambos aparecem no footer. O usuário pode copiar manualmente.

3. **Links:** Os links para RVS e CleverIA abrem em nova aba, mantendo a página do Chat Hotel aberta.

4. **Cor:** Os links aparecem na cor da marca (dourado/selecionada) para diferenciação visual.

5. **Footer Grid:** A estrutura do footer foi refatorada para suportar links flexíveis em qualquer coluna.

---

**Versão:** 1.0.1  
**Status:** ✅ Implementado e Testado  
**Próximo Passo:** Deploy em Vercel

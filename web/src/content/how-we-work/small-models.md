---
category: "Small Models"
title: "Open Weight & Local AI"
themeColor: "bg-card-lilac"
order: 3
---
<p class='mb-4'>
  Agentic workflows are ferociously token-intensive, making exclusive reliance 
  on state-of-the-art (SOTA) models economically restrictive. For example, 
  on AWS Bedrock, Claude Fable 5 costs $10.00/$50.00 (input/output) per 1M tokens. 
  Opting instead for a capable open-weight model like Gemma 4 31B 
  ($0.14/$0.40 per 1M tokens) yields a <strong>111x cost reduction</strong>, 
  suggesting that utilizing non-SOTA models is a viable optimization.
</p>
<p class='mb-4'>
  In addition, robust performance is readily achievable by running 
  <strong>open-weight</strong> models directly on <strong>local hardware</strong>. 
  The primary requirement is sufficient VRAM or unified memory to fit the model 
  parameters and context window. Gemma 4 31B runs comfortably on accessible 
  machines like the Apple Mac mini M4 Pro 48GB ($2,199), 
  AMD Ryzen AI Halo Max+ 395 128GB ($3,999), or NVIDIA DGX Spark 128GB ($4,679).
</p>
<p class='mb-4'>
  Beyond eliminating token costs entirely, local execution guarantees 
  <strong>data sovereignty</strong> &mdash; ensuring your proprietary 
  codebase and sensitive data never leave your secure environment.
</p>
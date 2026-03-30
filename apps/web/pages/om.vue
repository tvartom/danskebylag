<script setup lang="ts">
useHead({ title: 'Om projektet — Danske Bylag' })
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-serif font-bold mb-6">Om projektet</h1>

    <div class="prose prose-stone max-w-none">
      <h2>Om boken</h2>
      <p>
        <em>Danske Bylag</em> skrevs av Poul Meyer och publicerades 1949 som en
        doktorsavhandling vid Köpenhamns Universitet. Boken är en rättshistorisk
        framställning av det danska landsbystyret — <em>bylaget</em> — och dess
        organisation, kompetens och rättegång, sett mot bakgrund av
        jordfällesskapets huvudproblem.
      </p>

      <h2>Om denna webbplats</h2>
      <p>
        Webbplatsen presenterar varje kapitel i tre vyer:
      </p>
      <ul>
        <li><strong>Dansk original</strong> — den danska texten extraherad från PDF-originalet</li>
        <li><strong>Svensk översättning</strong> — en moderniserad svensk översättning</li>
        <li><strong>Sammanfattning</strong> — en strukturerad svensk sammanfattning med nyckelbegrepp och ordlista</li>
      </ul>

      <h2>Källa</h2>
      <p>
        PDF-originalet finns tillgängligt via
        <a
          href="https://jura.ku.dk/jurabog/pdf/juridiske-monografier/Meyer_Dansk_bylag_1949.pdf"
          target="_blank"
          rel="noopener"
        >
          Københavns Universitets digitala juridiska bibliotek
        </a>.
      </p>
    </div>
  </div>
</template>

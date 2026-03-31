<script setup lang="ts">
const props = defineProps<{
	daHtml: string
	svHtml: string
	summaryHtml: string
	pdfPages: string
	showPdfTab?: boolean
}>()

const activeTab = ref('summary')
</script>

<template>
  <PrimeTabs v-model:value="activeTab">
    <PrimeTabList>
      <PrimeTab value="summary">Sammanfattning</PrimeTab>
      <PrimeTab value="sv">Svensk översättning</PrimeTab>
      <PrimeTab value="da">Dansk original</PrimeTab>
      <PrimeTab v-if="props.showPdfTab !== false" value="pdf">Original PDF</PrimeTab>
    </PrimeTabList>
    <PrimeTabPanels>
      <PrimeTabPanel value="summary">
        <ChapterContent :html="props.summaryHtml" lang="sv" />
      </PrimeTabPanel>
      <PrimeTabPanel value="sv">
        <ChapterContent :html="props.svHtml" lang="sv" />
      </PrimeTabPanel>
      <PrimeTabPanel value="da">
        <ChapterContent :html="props.daHtml" lang="da" />
      </PrimeTabPanel>
      <PrimeTabPanel v-if="props.showPdfTab !== false" value="pdf">
        <ChapterPdf v-if="activeTab === 'pdf'" :pdfPages="props.pdfPages" />
      </PrimeTabPanel>
    </PrimeTabPanels>
  </PrimeTabs>
</template>

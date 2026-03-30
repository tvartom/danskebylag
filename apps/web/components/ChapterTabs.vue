<script setup lang="ts">
const props = defineProps<{
  daHtml: string
  svHtml: string
  summaryHtml: string
}>()

const activeTab = ref('summary')
</script>

<template>
  <PrimeTabs v-model:value="activeTab">
    <PrimeTabList>
      <PrimeTab value="summary">Sammanfattning</PrimeTab>
      <PrimeTab value="sv">Svensk översättning</PrimeTab>
      <PrimeTab value="da">Dansk original</PrimeTab>
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
    </PrimeTabPanels>
  </PrimeTabs>
</template>

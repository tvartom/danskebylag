<script setup lang="ts">
import { glossary } from '~/content/glossary.js'

useHead({ title: 'Ordlista — Danske Bylag' })

const search = ref('')

const filtered = computed(() => {
	const q = search.value.toLowerCase()
	if (!q) return glossary
	return glossary.filter(
		(e) =>
			e.da.toLowerCase().includes(q) ||
			e.sv.toLowerCase().includes(q) ||
			e.definition.toLowerCase().includes(q),
	)
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-serif font-bold mb-6">Ordlista</h1>
    <p class="text-muted-color mb-6">
      Dansk–svensk ordlista med termer från <em>Danske Bylag</em>.
    </p>

    <PrimeInputText
      v-model="search"
      placeholder="Sök term..."
      class="w-full mb-6"
    />

    <PrimeDataTable :value="filtered" stripedRows>
      <PrimeColumn field="da" header="Danska" sortable />
      <PrimeColumn field="sv" header="Svenska" sortable />
      <PrimeColumn field="definition" header="Förklaring" />
    </PrimeDataTable>
  </div>
</template>

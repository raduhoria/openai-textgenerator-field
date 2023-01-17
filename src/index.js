import openaitextgeneratorfield from "./components/fields/openai-textgenerator-field.vue";
panel.plugin('raduhoria/openai-textgenerator-field', {
  fields: {
    openaitextgeneratorfield: openaitextgeneratorfield
  },
  blocks: {
    aitext: `
    <div @click="open">
      <div v-html="content.aiarticle"></div>
    </div>
    `
  }
});

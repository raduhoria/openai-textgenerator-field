<template>
  <k-field :label="label">
    <k-text-field type="text" label="New prompt:" v-model="prompttext"></k-text-field>
    <k-select-field
        v-model="valuepromptselected"
        :options="valueprompt"
        name="select"
        type="select"
        label="Select saved prompts:"
    />
    <k-button icon="check" @click="loadAI" >Generate AI text</k-button>
    <k-textarea-field theme="field" size="large" type="text" name="textfield" ref="kgpt3textfield" :value="value" @input="onInput" />
  </k-field>
</template>

<script>
export default {
  props: {
    label: String,
    value: String,
  },
  data () {
    return {
      prompttext: '',
      valueprompt: [],
      valuepromptselected: '',
    }
  },
  created() {
    this.loadJSONforPrompt();
  },
  methods: {
    onInput(value) {
      this.$emit("input", value);
    },
    loadJSONforPrompt(){
      this.$api
          .get("openai-textgenerator-field/getpromptdata")
          .then(response => {
            //console.log(response);
            this.valueprompt = response;
          })
          .catch(error => {
            console.log(error.message);
          })
    },
    saveJSONforPrompt(){
      this.$api
          .post("openai-textgenerator-field/setpromptdata",{promptvalues:this.valueprompt})
          .then(response => {
            //console.log(response);
            //this.loadPhotoAI();
          })
          .catch(error => {
            console.log(error.message);
          })
    },
    loadAI(){
      //console.log(this.valuepromptselected);
      if(this.prompttext==''&&this.valuepromptselected==''){
        alert('Please create a question (prompt) or select an existing one!');
        return false;
      }
      if(this.prompttext!==''){
        if(this.valueprompt.find(({ text }) => text == this.prompttext) == undefined){ //unique values only
          let valueToPush = {};
          valueToPush["value"] = this.prompttext;
          valueToPush["text"] = this.prompttext;
          this.valueprompt.push(valueToPush);
        }
        this.saveJSONforPrompt();
      }
      let sprompt = this.prompttext!=='' ? this.prompttext : this.valuepromptselected;
      this.$api
          .post("openai-textgenerator-field/generatetext",{prompt:sprompt})
          .then(response => {
            //console.log(response);
            if(response.choices) {
              this.onInput(response.choices[0].text);
            }else{
              this.onInput(response.error.message);
            }
            //this.loadPhotoAI();
          })
          .catch(error => {
            //this.error = error.message
            //console.log(error.message);
            this.onInput(error.message);
          })
    },
  }
}
</script>
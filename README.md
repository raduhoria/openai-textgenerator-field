# Kirby CMS – OpenAI generated article text

Generate text for Kirby CMS (https://getkirby.com/) articles with OpenAI APIs (field & block item).

**Features:**
- Enable the OpenAI API call to retrieve generated text
- Custom field with prompt (questions)
- Block item that reuse the custom field
- Saving the prompts (questions) for reuse its

## Overview

> This plugin is completely free and published under the MIT license. However, if you are using it in a commercial project and want to help me keep up with maintenance, please consider to **[❤️ sponsor me](https://github.com/sponsors/horia22)** for securing the continued development of the plugin.

![Block item](https://github.com/raduhoria/openai-textgenerator-field/blob/main/readmeimages/Screenshot%202023-01-17%20122425.png)
![](https://github.com/raduhoria/openai-textgenerator-field/blob/main/readmeimages/Screenshot%202023-01-17%20122511.png)
![](https://github.com/raduhoria/openai-textgenerator-field/blob/main/readmeimages/Screenshot%202023-01-17%20143949.png)
****

## 1. Installation

This version of the plugin requires PHP 7.4 and Kirby 3.6.0 or higher. The recommended way of installing is by using Composer:

```
$ composer require raduhoria/openai-textgenerator-field
```

Alternatively, download and copy this repository to `/site/plugins/openai-textgenerator-field`

## 2. Settings
Please consult the link for getting API key: https://beta.openai.com/account/api-keys

Please consult the link for getting Organization ID: https://beta.openai.com/account/org-settings

Just edit file:
```
/site/plugins/openai-textgenerator-field/src/config/options.php
```
and complete the settings:
```
[
  'openaiapikey' => '', //your OpenAI API key
  'openaiorganization' => '', //your organization ID
  'max_tokens' => 4000, //max_tokens variable according with your OpenAI package
  'temperature' => 0.7,
];
```
Please consult the link for understand the `temperature` variable in completions API: https://beta.openai.com/docs/api-reference/completions/create#completions/create-temperature

### Prerequisites

If you're testing locally, the plugin is using php curl function. You need to ensure that cacert.pem certificate is installed.
1. Download the latest cacert.pem from https://curl.se/ca/cacert.pem
2. Add the following line to php.ini: 
``` 
[curl]
; A default value for the CURLOPT_CAINFO option. This is required to be an
; absolute path.
curl.cainfo = your full path\cacert.pem
```
(if this is shared hosting and you don't have access to php.ini then you could add this to .user.ini in public_html).

## 3. Setup

This field can be used in blocks fieldsets `- aitext` option or like a field type `openaitextgeneratorfield`:

```yaml
fields:
    text:
        type: blocks
        fieldsets:
            - aitext
```
```yaml
fields:
    openaitextgeneratorfield:
        type: openaitextgeneratorfield
        label: OpenAI text generator
```

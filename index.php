<?php
Kirby::plugin('raduhoria/openai-textgenerator-field', [
   'options' => [
      'openaiapikey' => '',
      'openaiorganization' => '',
      'max_tokens' => 4000,
      'temperature' => 0.7,
   ],
   'blueprints' => [
      'blocks/aitext' => __DIR__ . '/blueprints/blocks/aitext.yml',
   ],
   'snippets' => [
      'blocks/aitext' => __DIR__ . '/snippets/blocks/aitext.php',
   ],
   'api' => [
      'routes' => function($kirby){ return [
         [
            'pattern' => 'openai-textgenerator-field/getpromptdata',
            'method' => 'GET',
            'action' => function () {
               $path = kirby()->roots()->content().'/promptvalues.json';
               if(F::exists($path)){
                  return Data::read($path);
               }else {
                  return [];
               }
            }
         ],
         [
            'pattern' => 'openai-textgenerator-field/setpromptdata',
            'method' => 'POST',
            'action' => function () {
               $promptvalues = get('promptvalues');
               $path = kirby()->roots()->content().'/promptvalues.json';
               $error = null;
               try{
                  Data::write($path, $promptvalues);
               } catch (Exception $e) {
                  $error = $e->getMessage();
               }
               return ['error'=>$error];
            }
         ],
         [
            'pattern' => 'openai-textgenerator-field/generatetext',
            'method' => 'POST',
            'action' => function () {
               $prompt = get('prompt');
               $open_ai_key = option('raduhoria.openai-textgenerator-field.openaiapikey');
               $authorization = "Authorization: Bearer ".$open_ai_key;
               $openaiorganization = option('raduhoria.openai-textgenerator-field.openaiorganization');
               $openaiorganization_authorization = 'OpenAI-organization: '.$openaiorganization;
               $curlheader = array(
                  'Content-Type: application/json',
                  $authorization,
                  $openaiorganization_authorization
               );
               //dump($curlheader);
               $postfields = [
                 "model"=> "text-davinci-003",
                 "prompt"=> $prompt."output:",
                 "max_tokens"=> option('raduhoria.openai-textgenerator-field.max_tokens'),
                 "temperature"=> option('raduhoria.openai-textgenerator-field.temperature'),
                 "top_p"=> 1,
                 "n"=> 1,
                 "stream"=> false,
                 "logprobs"=> null,
                 "stop"=> ["input:"],
               ];
               $ch = curl_init();
               curl_setopt($ch, CURLOPT_URL,"https://api.openai.com/v1/completions");
               curl_setopt($ch, CURLOPT_HTTPHEADER, $curlheader);
               curl_setopt($ch, CURLOPT_POST, 1);
               curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($postfields));
               curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
               curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
               curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
               curl_setopt($ch, CURLOPT_TIMEOUT, 30);
               $response = curl_exec($ch);
               $err = curl_error($ch);
               curl_close($ch);
               //dump($response);
               return $response;
            }
         ],
   ];},
   ],
   'fields' => [
      'openaitextgeneratorfield' => [

      ]
   ],
]);

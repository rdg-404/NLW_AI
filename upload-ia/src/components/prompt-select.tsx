import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { api } from "@/lib/axios";

interface Prompt {
  id: string
  title: string
  template: string
}

interface PromptSelectedProps {
  onPromptSelected: (template: string) => void
}

export function PromptSelect(props: PromptSelectedProps){
  const [prompts, setPrompts] = useState<Prompt[] | null>(null)


  // get prompts from db 
  useEffect(() => {
    api.get('/prompts').then(response => {
      setPrompts(response.data);

      console.log(response.data)
    })
  }, [])

  function handleTemplatePromptSelected(promptId: string){
    const selectedPrompt = prompts?.find(prompt => prompt.id === promptId)

    if(!selectedPrompt){
      return
    }

    // get template from prompt selected
    props.onPromptSelected(selectedPrompt.template)
  }
  return (
    <Select onValueChange={handleTemplatePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..." />
      </SelectTrigger>
      <SelectContent>
        {prompts?.map(prompt => {
          return (
            <SelectItem key={prompt.id} value={prompt.id}>
              {prompt.title}
            </SelectItem>
          )
        })}
      </SelectContent>
  </Select>
  )
}
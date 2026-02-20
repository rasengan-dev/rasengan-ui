import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReactNode } from "react"

export default function TabsComponent({
	triggers = [],
	children
}: {
	triggers: string[],
	children: ReactNode
}) {
  return (
    <Tabs defaultValue={triggers.length > 0 ? triggers[0].toLowerCase() : ""}>
      <TabsList variant="line">
        {
					triggers.map(trigger => (
						<TabsTrigger value={trigger.toLowerCase()}>{trigger}</TabsTrigger>
					))
        }
      </TabsList>
      {children}
    </Tabs>
  )
}


import CityPicker from "@/components/CityPicker"
import { Card, Divider, Subtitle, Text } from "@tremor/react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#395299] to-[#203b85] p-10 flex flex-col justify-center items-center">
      <Card>
        <Text className="text-6xl font-bold text-center mb-10">Weather AI</Text>
        <Subtitle className="text-xl text-center">Powered by Next.js 13.4, Tailwind CSS, Tremor 2.0 + More!</Subtitle>

        <Divider className="my10"/>

        <Card className="bg-gradient-to-br from-[#395299] to-[#203b85]">
          <CityPicker/>
        </Card>
      </Card>
    </div>
  )
}

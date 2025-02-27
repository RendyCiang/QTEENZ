import { useState } from "react";
import RadioButton from "@/components/general/RadioButton";

function Login() {

  const [radioOption, setRadioOption] = useState<string>("");
  
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Radio Button Test</h2>
      
      <div className="flex-col gap-2 mt-2">
        <RadioButton label="Vendor" value="Vendor" name="example 1" checked={radioOption === "Vendor"} onChange={setRadioOption}/>
        <RadioButton label="Pembeli" value="Pembeli" name="example 1" checked={radioOption === "Pembeli"} onChange={setRadioOption}/>
      </div>
    </div>
  )
}

export default Login
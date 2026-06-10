import ArrayBlock from "./ArrayBlock"
import ArrayBar from "./ArrayBar"
import { ArrayBar as ArrayBarType } from "@/types/array"


export default function ArrayVisual({array}: {array: ArrayBarType[]}){
    return(
        <div className="flex flex-col justify-center items-center max-w-[60vw]">
            <div className="flex gap-1 items-end max-w-[60vw]">
                {array.map((bar, index) => (
                    <ArrayBar key={bar.id} value={bar.value} state={bar.state}/>
                ))}
            </div>
            {/*<div className="flex gap-1 items-end mt-2 max-w-[60%]">
                {array.map((bar, index) => (
                    <ArrayBlock key={bar.id} value={bar.value} state={bar.state}/>
                ))}
            </div>*/}
            
        </div>
        
    )
}
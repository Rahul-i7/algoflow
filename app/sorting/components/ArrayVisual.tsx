import ArrayBlock from "./ArrayBlock"
import ArrayBar from "./ArrayBar"


export default function ArrayVisual({array}: {array: number[]}){
    return(
        <div className="flex flex-col items-center">
            <div className="flex gap-1 items-end max-w-[60vw]">
                {array.map((value, index) => (
                    <ArrayBar key={index} value={value}/>
                ))}
            </div>
            <div className="flex gap-2 items-center mt-2 w-[60%]">
                {array.map((value, index) => (
                    <ArrayBlock key={index} value={value}/>
                ))}
            </div>
            
        </div>
        
    )
}
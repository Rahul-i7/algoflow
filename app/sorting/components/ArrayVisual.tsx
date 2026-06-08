import ArrayBlock from "./ArrayBlock"


export default function ArrayVisual({array}: {array: number[]}){
    return(
        <>
            <div className="flex gap-2">
                {array.map((value, index) => (
                    <ArrayBlock key={index} value={value} active={false}/>
                ))}
            </div>
        </>
    )
}


export const Die = (props) => {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return(
        <div onClick={props.holdDice} style={styles} className="w-[50px] h-[50px] text-xl font-bold bg-white shadow-md flex justify-center items-center rounded-xl cursor-pointer">
            {props.value}
         </div>
        
    )
}
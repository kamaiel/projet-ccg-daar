import "./Card.css"

const Card = (props:any) => {

    const cardLink = props.cardLink

    return(
        <div style={{marginTop:(props.index<props.firstCard)?"200px":"0px"}} className="card">
            <img src={cardLink} alt="card" />
        </div>
    )
}

export default Card
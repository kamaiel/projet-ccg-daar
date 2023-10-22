import "./Card.css"

const Card = (props:any) => {

    const cardLink = props.cardLink

    return(
        <div className="card">
            <img src={cardLink} alt="card" />
        </div>
    )
}

export default Card
import './UserDetails.css'

export default function UserDetails(props: { image: string; username: string ;isUser: boolean; createdAt: string })
{
    return (
        <div className="user-details">
          <img src={props.image} alt="avatar"  className="avatar" />
          <p className="bold dark-blue-txt">{props.username}</p>
          { props.isUser && <div className="you"><p>you</p> </div>}
          <p>{props.createdAt}</p>
        </div>
  );
}
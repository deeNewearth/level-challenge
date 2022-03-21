import moment from "moment";

export default function WelcomeView({serverPath}:{
    serverPath:string;
}){

    return <div>
        <h1>Welcome to the App</h1>
        <div>
            <p>
                <span>Server Path: </span><strong>{serverPath}</strong>
            </p>
            <p>
            <span>{moment().format()}</span>
            </p>
            
        </div>
    </div>;

}
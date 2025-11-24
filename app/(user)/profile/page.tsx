import Header from "@/app/components/UserPages/Header";
import Userprofile from "@/app/components/UserPages/userprofile";
import CreateForm from "@/app/components/UserPages/PostCreate";

;

export default function DashboardPage(){
    return(
        <section>
            <Header/>
            <Userprofile/>
            <CreateForm/>
        </section>
    );
}
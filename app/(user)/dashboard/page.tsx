import Header from "@/app/components/UserPages/Header";
import PostList from "@/app/components/UserPages/PostList";
import CreateForm from "@/app/components/UserPages/PostCreate";

export default function DashboardPage(){
    return(
        <section>
            <Header/>
            <CreateForm/>
            <PostList/>
        </section>
    );
}
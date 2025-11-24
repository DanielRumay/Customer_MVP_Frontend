import Header from "@/app/components/UserPages/Header";
import PostList from "@/app/components/UserPages/PostList";

export default function DashboardPage(){
    return(
        <section>
            <Header/>
            <PostList/>
        </section>
    );
}
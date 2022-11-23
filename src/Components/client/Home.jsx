import Reserve from "../Reserve";
import ShowNav from "../ShowNav";
import Filter from "./Filter";
import List from "./List";

function Home(){
    return(
        <>
            <ShowNav />
            <Filter />
            <h1>Knygu sarašas</h1>
            <List />
            <Reserve />
        </>
    );
}

export default Home;
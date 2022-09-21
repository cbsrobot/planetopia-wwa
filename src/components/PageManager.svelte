<script>
    import { generatePageList } from "../modules/PageListFactory.js";
    import { loggedIn } from "../modules/DataManager.js";

    let pagesList = []
    $: if($loggedIn) pagesList = generatePageList()
    $: totalPages = pagesList.length;
    

    let pageIndex = 0;
    $: activePage = pagesList[pageIndex]

</script>

<svelte:component this={activePage.component} {...activePage.props} bind:pageIndex={pageIndex} {totalPages}/>
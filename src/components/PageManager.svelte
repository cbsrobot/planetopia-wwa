<script>
    import DialoguePage from './DialoguePage.svelte';

    let listOfPages = [
        { name: "Dialogue", component: DialoguePage, props: {dialogueText: "Text 1"}},
        { name: "Dialogue", component: DialoguePage, props: {dialogueText: "Text 2"}},
        { name: "Dialogue", component: DialoguePage, props: {dialogueText: "Text 3"}},
    ]
    $: totalPages = listOfPages.length;

    let pageIndex = 0;
    $: activePage = listOfPages[pageIndex]

</script>

<svelte:component this={activePage.component} {...activePage.props} bind:pageIndex={pageIndex} {totalPages}/>
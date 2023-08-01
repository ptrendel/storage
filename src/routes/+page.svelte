<script>
    import { slide } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { enhance } from '$app/forms';

    import MdEdit from 'svelte-icons/md/MdEdit.svelte'
    import MdDelete from 'svelte-icons/md/MdDelete.svelte'

    export let data;
    export let form;
    let showForm = false;
    let locations = []
    let action = '';
    $: action = form?.action ?? ''
    $: showForm = (action === 'new' || action === 'edit' || action === 'create' || action === 'update')
    $: locations = data?.locations ?? []
</script>

<div class=" ">
    <div class="fixed top-0 w-full h-30 bg-cyan-900 p-8 rounded-br-3xl drop-shadow-md text-white">
        <h1 class="text-2xl mt-16 font-semibold">Emplacements</h1>
        <p class="text-sm">Zones de stockage</p>
        <button on:click={()=>action='new'} class="absolute -bottom-4 right-8 w-10 h-10 bg-slate-700 text-white rounded-full text-xl font-bold">+</button>
    </div>
    <div class="p-8 mt-44 ">

        {#each locations as location}

            <form method="post" use:enhance action={`?/${action}`} class="flex justify-between border bg-white border-slate-100 rounded-lg shadow-lg my-4 pt-2 p-4">

                <a href={`/location/${location.id}`} class="block   " >
                    <h2 class="font-bold text-xl">{location.name}</h2>
                    <p class="text-sm"> {location.description}</p>
                </a>
                <div class="flex  items-center">
                    <input type="hidden" name="id" value={location.id}>
                    <button on:click={()=> {showForm = true; action='edit' }}><span class="block icon"><MdEdit/></span></button>
                    <button on:click={()=> {action='confirmDelete' }}><span class="block icon"><MdDelete/></span></button>
                </div>
                
            </form>
            
        {/each}
        

    </div>

    {#if showForm}

    <div class="fixed bottom-0 bg-cyan-600 p-8 w-full rounded-t " transition:slide={{ delay: 100, duration: 300, easing: quintOut, axis: 'y' }}>
        {#if action === 'confirmDelete'}
            <p>Confirmez la suppression de {form.name} ?</p>
            <button on:click={()=> {action='delete' }}>Delete</button>
        {:else}
            <form use:enhance action={action==='edit' ? '?/update' : '?/create'} method="POST">
                <input type="hidden" name="id" value={form?.id ?? ''}>
                <input type="text" name="name" id="name" value={form?.name ?? ''}>
                <input type="text" name="description" id="description" value={form?.description ?? ''}>
                <button >{action==='edit' ? 'Update' : 'Create'}</button>
            </form>
            <button on:click={()=>showForm = false}>Cancel</button>
        {/if}
        
    </div>
    {/if}
</div>


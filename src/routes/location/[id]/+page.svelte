<script>
    export let data;
    export let form;

    let location;
    let showForm = false;
    let action = '';

    $: location = data?.location
    $: action = form?.action ?? '';
</script>
<div class="border border-1 p-4 mx-4 my-8">
    <h4 class="text-lg font-bold">Logement pour {location.name}</h4>
    <p class="text-sm">{location.description}</p>

    <div class="fixed w-full bottom-0 flex justify-center p-4">
        <button class=" text-white bg-violet-950 rounded-full w-10 h-10 flex justify-center items-center" >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18 10h-4V6a2 2 0 0 0-4 0l.071 4H6a2 2 0 0 0 0 4l4.071-.071L10 18a2 2 0 0 0 4 0v-4.071L18 14a2 2 0 0 0 0-4z"/></svg>
        </button>
    </div>

    <div class="absolute bottom-0 bg-blue-500 ">
        <form action="?/addStorage" method="POST">
            <input type="hidden" name="locationId" value="{location.id}">
            <div>
                <label for="name">Nom</label>
                <input type="text" name="name" id="name" value={form?.name ?? ''}>
            </div>
            <div>
                <label for="description">Description</label>
                <input type="text" name="description" id="description" value={form?.description ?? ''}>
            </div>
            <div>
                <label for="description">Volume</label>
                <input type="text" name="volume" id="volume" value={form?.volume ?? ''}>
            </div>
            <div>
                <label for="type">Type</label>
                <select name="type" id="type">
                    <option value="Cuve béton">Cuve béton</option>
                    <option value="Cuve Inox">Cuve Inox</option>
                    <option value="Cuve Fibre">Cuve fibre</option>
                    <option value="Oeuf Fibre">Oeuf fibre</option>
                    <option value="Oeuf Fibre">Pyramide</option>
                    <option value="Oeuf Fibre">Fût</option>
                    <option value="Bouteilles">Bouteilles 75cl</option>
                    <option value="Bouteilles">Bouteilles 1.5l</option>
                </select>
            </div>
            <button>Ajouter</button>
        </form>
    </div>
</div>
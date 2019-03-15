@if (!empty($data->id))
    <?php
        $relatedlist = \Uccello\Core\Models\Relatedlist::find($data->id);
    ?>
    @if(!is_null($relatedlist) && Auth::user()->canRetrieve($domain, $relatedlist->relatedModule))
    <div class="row">
        <div class="col s12">
            <div class="dataTable-container m-b-20" id="relatedlist_{{ $relatedlist->relatedModule->name }}_{{ $relatedlist->id }}_widget" data-button-size="mini">
                {{-- Card --}}
                @include('uccello::modules.default.detail.relatedlists.card')
            </div>
        </div>
    </div>
    @endif
@endif
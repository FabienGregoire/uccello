<?php $isLarge = $forceLarge ?? $field->data->large ?? false; ?>
<div class="col m2 s5">
    <b>{{ uctrans($field->label, $module) }}</b>
</div>
<div class="col {{ $isLarge ? 's7 m10' : 's7 m4' }}">
    <?php
        $value = $field->uitype->getFormattedValueToDisplay($field, $record);
        $valueParts = explode(';', $value);
        $fileName = $valueParts[0];
    ?>
    @if (count($valueParts) === 2)
        <div class="truncate">
            <a href="{{ ucroute('uccello.download', $domain, $module, [ 'id' => $record->getKey(), 'field' => $field->column ]) }}"
                title="{{ uctrans('button.download_file', $module) }}">
                {{ $fileName }}
            </a>
        </div>
    @else
        &nbsp;
    @endif
</div>
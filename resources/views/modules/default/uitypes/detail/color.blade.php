<?php $isLarge = $forceLarge ?? $field->data->large ?? false; ?>
<?php $color = $record->{$field->name} ?? 'transparent'; ?>
<div class="col m2 s5 field-label">
    <?php $label = uctrans($field->label, $module); ?>
    <b title="{{ $label }}">{{ $label }}</b>
</div>
<div class="col {{ $isLarge ? 's7 m10' : 's7 m4' }}" style="position: relative">
    <span class="p-l-30">{{ uitype($field->uitype_id)->getFormattedValueToDisplay($field, $record) }}</span>
    <span style="position: absolute; top: -18px; font-size: 35px; color: {{ $color }}">&#9632;</span>
</div>
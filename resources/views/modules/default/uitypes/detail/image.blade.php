<?php $isLarge = $forceLarge ?? $field->data->large ?? false; ?>
<div class="col-sm-2 col-xs-5">
    <strong>{{ uctrans($field->label, $module) }}</strong>
</div>
<div class="{{ $isLarge ? 'col-sm-10 col-xs-7' : 'col-sm-4 col-xs-7' }}">
    <?php $value = $field->uitype->getFormattedValueToDisplay($field, $record); ?>
    @if($value)
        <div class="img-container">
            <img src="{{ $value }}" class="img-responsive">
        </div>
    @else
        &nbsp;
    @endif
</div>
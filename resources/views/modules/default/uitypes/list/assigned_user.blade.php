<?php $value = $field->uitype->getFormattedValueToDisplay($field, $record); ?>
@if ($value)
<a href="{{ ucroute('uccello.detail', $domain, 'user', ['id' => $record->{$field->column}]) }}" class="btn-flat waves-effect primary-text">{{ $value }}</a>
@endif
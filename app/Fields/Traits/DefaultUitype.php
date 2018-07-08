<?php

namespace Uccello\Core\Fields\Traits;

use Uccello\Core\Models\Field;
use Uccello\Core\Models\Module;
use Uccello\Core\Models\Domain;


trait DefaultUitype
{
    /**
     * Returns options for Form builder.
     *
     * @param mixed $record
     * @param Field $field
     * @param Module $module
     * @return array
     */
    public function getFormOptions($record, Field $field, Module $module): array
    {
        return [];
    }

    /**
     * Returns default column name.
     *
     * @return string
     */
    public function getDefaultColumn(Field $field) : string
    {
        return $field->name;
    }

    /**
     * Returns default icon.
     *
     * @return string|null
     */
    public function getDefaultIcon() : ?string
    {
        return null;
    }

    /**
     * Returns value to display.
     *
     * @param Field $field
     * @param mixed $record
     * @return string
     */
    public function getDisplayedValue(Field $field, $record) : string
    {
        return $record->{$field->column} ?? '';
    }

    /**
     * Returns sanitized value for saving.
     *
     * @param Field $field
     * @param mixed|null $value
     * @param mixed|null $record
     * @param Domain|null $domain
     * @param Module|null $module
     * @return string|null
     */
    public function getSanitizedValueForSaving(Field $field, $value, $record=null, ?Domain $domain=null, ?Module $module=null) : ?string
    {
        return $value;
    }
}
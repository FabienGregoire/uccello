<?php

namespace Uccello\Core\Http\Controllers\Domain;

use Illuminate\Http\Request;
use Uccello\Core\Http\Controllers\Core\EditController as CoreEditController;
use Uccello\Core\Models\Domain;
use Uccello\Core\Models\Module;

class EditController extends CoreEditController
{
    /**
     * {@inheritdoc}
     */
    public function save(?Domain $domain, Module $module, Request $request, bool $redirect = true)
    {
        if ($request->get('id')) {
            // To use $record->setAsRoot(), we have to get the current version of the domain,
            // before to set parent_id = null. Because $record->setAsRoot() works only on a
            // domain where parent_id != null
            $record = Domain::find($request->get('id'));

            if ($record) { // Config before update
                $this->configTree($record);
            }
        }

        // Default behaviour without redirection
        $record = parent::save($domain, $module, $request, false); // Get a fresh version of $record, after saving

        // Get mode
        $mode = $record->getKey() ? 'edit' : 'create';

        if ($mode == 'create') { // Config after create
            $this->configTree($record);
        }

        // Update current domain if we are editing it (data could have been changed)
        if ($this->domain->getKey() === $record->getKey()) {
            $this->domain = $record;
        }

        // Redirect to detail view (we use $this->domain instead of $domain because slug could have been changed)
        if ($redirect === true) {
            $route = ucroute('uccello.detail', $this->domain, $module, [ 'id' => $record->getKey() ]);

            return redirect($route);
        }
    }

    /**
     * Config tree path
     *
     * @param \Uccello\Core\Models\Domain $record
     * @return void
     */
    protected function configTree($record)
    {
        // Set parent domain
        $parentDomain = Domain::find(request('parent'));
        if (!is_null($parentDomain)) {
            with($record)->setChildOf($parentDomain);
        }
        // Remove parent domain
        else {
            $record->setAsRoot();
        }
    }
}

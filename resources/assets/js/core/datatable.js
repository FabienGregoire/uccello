import { Link } from './link'

export class Datatable {
    /**
     * Init Datatable configuration
     * @param {Element} element
     */
    init(element) {
        this.table = $(element)
        this.linkManager = new Link(false)

        this.initColumnVisibilityListener()
        this.initRecordsNumberListener()
    }

    makeQuery(page) {
        if (!this.table) {
            return
        }

        // Get query URL
        let url = $(this.table).data('list-url') + '&length=' + $(this.table).attr('data-length')

        if (typeof page !== 'undefined') {
            url += `&page=${page}`
        }

        // Delete old records
        $('tbody tr.record', this.table).remove()

        // Hide no_result row
        $('tbody tr.no-results').hide()

        // Hide pagination
        $(`.pagination[data-table="${this.table.attr('id')}"]`).hide()

        // Show loader
        $(`.loader[data-table="${this.table.attr('id')}"]`).removeClass('hide')

        // Make query
        $.get(url).then((response) => {
            this.displayResults(response)
            this.displayPagination(response)

            // Hide loader
            $(`.loader[data-table="${this.table.attr('id')}"]`).addClass('hide')
        })
    }

    displayResults(response) {
        if (!this.table || !response.data) {
            return
        }

        if (response.data.length === 0) {
            // No result
            $('tbody tr.no-results').show()
        } else {
            // Add a row by record
            for(let record of response.data) {
                this.addRowToTable(record)
            }
        }
    }

    displayPagination(response) {
        if (!this.table || !response.data) {
            return
        }

        let previousLinkClass = response.prev_page_url === null ? 'disabled' : 'waves-effect'
        let previousDataPage = response.prev_page_url ? `data-page="${response.current_page - 1}"` : ''
        let paginationHtml = `<li class="${previousLinkClass}"><a href="javascript:void(0);" ${previousDataPage}><i class="material-icons">chevron_left</i></a></li>`

        for (let i=1; i<=response.last_page; i++) {
            if (i === response.current_page) {
                paginationHtml += `<li class="active"><a href="javascript:void(0);" class="primary">${i}</a></li>`
            } else {
                paginationHtml += `<li class="waves-effect"><a href="javascript:void(0);" data-page="${i}">${i}</a></li>`
            }
        }

        let nextLinkClass = response.next_page_url === null ? 'disabled' : 'waves-effect'
        let nextDataPage = response.next_page_url ? `data-page="${response.current_page + 1}"` : ''
        paginationHtml += `<li class="${nextLinkClass}"><a href="javascript:void(0);" ${nextDataPage}><i class="material-icons">chevron_right</i></a></li>`

        let paginationElement = $(`.pagination[data-table="${this.table.attr('id')}"]`)
        paginationElement.html(paginationHtml)
        paginationElement.show()

        // Init click listener
        $('a[data-page]', paginationElement).on('click', (el) => {
            let page = $(el.currentTarget).attr('data-page')

            this.makeQuery(page)
        })
    }

    addRowToTable(record) {
        if (!this.table || !record) {
            return
        }

        // Clone row template
        let tr = $('tbody tr.template', this.table).clone()

        // Create each cell according to all headers
        $('th[data-field]', this.table).each(function() {
            let fieldName = $(this).data('field')
            let fieldColumn = $(this).data('column')

            // Add content to the cell
            let td = $(`td[data-field="${fieldName}"] `, tr)
            td.html(record[fieldColumn])

            // Hide if necessary
            if (!$(this).is(':visible')) {
                td.hide()
            }
        })

        // Replace RECORD_ID by the record's id in all links
        $('a', tr).each(function() {
            let href = $(this).attr('href')
            href = href.replace('RECORD_ID', record.id)
            $(this).attr('href', href)

            if ($(this).attr('data-tooltip')) {
                $(this).tooltip()
            }
        })

        // Replace RECORD_ID by the record's id in the row url
        let rowUrl = $(tr).attr('data-row-url')
        rowUrl = rowUrl.replace('RECORD_ID', record.id)
        $(tr).attr('data-row-url', rowUrl)

        // Add click listener
        $(tr).on('click', function() {
            document.location.href = $(this).attr('data-row-url')
        })

        // Init click listener on delete button
        this.linkManager.initClickListener(tr)

        // Add the record to tbody
        tr.removeClass('hide')
            .removeClass('template')
            .addClass('record')
            .appendTo('tbody', this.table)
    }

    initColumnVisibilityListener() {
        $(`ul.columns[data-table="${this.table.attr('id')}"] li a`).on('click', (el) => {
            let element = $(el.currentTarget)
            let fieldName = $(element).data('field')

            // Select or unselect item in dropdown
            let liElement = $(element).parents('li:first')
            liElement.toggleClass('active')

            // Show or hide column
            if (liElement.hasClass('active')) {
                $(`th[data-field="${fieldName}"]`).show() // Label
                $(`td[data-field="${fieldName}"]`).show() // Content
            } else {
                $(`th[data-field="${fieldName}"]`).hide() // Label
                $(`td[data-field="${fieldName}"]`).hide() // Content
            }
        })
    }

    initRecordsNumberListener() {
        $(`ul.records-number[data-table="${this.table.attr('id')}"] li a`).on('click', (el) => {
            let element = $(el.currentTarget)
            let number = $(element).data('number')

            // Select or unselect item in dropdown
            let ulId = $(element).parents('ul:first').attr('id')
            $(`a[data-target="${ulId}"] strong.records-number`).text(number)

            $(this.table).attr('data-length', number)

            this.makeQuery()
        })
    }
}
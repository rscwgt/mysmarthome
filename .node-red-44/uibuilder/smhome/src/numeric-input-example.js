/* global $ */
/* this is an example for validation and change events */
$.fn.numericInputExample = function () {
	'use strict';
	var element = $(this),
	footer = element.find('tfoot tr'),
	dataRows = element.find('tbody tr'),
	initialTotal = function () {
		var column,
		total;
		/*
		for (column = 1; column < footer.children().size(); column++) {
		total = 0;
		dataRows.each(function () {
		var row = $(this);
		total += parseFloat(row.children().eq(column).text());
		});
		footer.children().eq(column).text(total);
		}; */
	};
	element.find('td').on('change', function (evt, newValue) {
		var cell = $(this);
		var column = cell.index();
        var rowIndex = $(this).parent().index();
		var colIndex = $(this).index();
		var val = parseFloat(newValue);
		var data = tblGetProfileData();
		var day = getSelectedDayId().toUpperCase();
		switch (colIndex) {
			case 0:
				data.data[day][rowIndex].endtime = val;
				break;
			case 1:
				data.data[day][rowIndex].temperature = val;
				break;
		}
        console.log("table row/col "+rowIndex+"/"+colIndex+" val "+val);
/*		
		total = 0;
		element.find('tbody tr').each(function () {
			var row = $(this);
			total += parseFloat(row.children().eq(column).text());
		});
*/
	}).on('validate', function (evt, value) {
		var cell = $(this);
		var column = cell.index();
		if (isNaN(parseFloat(value)) || !isFinite(value)) {
			return false;
		}
		switch (column) {
			case 0:
				if (value<0 || value>2400) {
					return false;
				}
				break;
			case 1:
				// only steps of 0.5
				if ((value*10 % 5) != 0) {
					return false;
				}
				if (value<5 || value>30) {
					return false;
				}
				break;
		}
		return true;
	});
	initialTotal();
	return this;
};
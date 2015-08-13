(function(b) {
	var Hotels = function() {
		this.params = { id: 'AvailabilitySearchId', data: 'Establishments' };
		this.element = { result: $('#result'), page: $('.page'), currentPage: $('.current-page'), totalPage: $('.total-page') };
		this.page = { count: 10, interval: 20, current: 0 };
		this.searchId = 0x0;
		this.original = {};
		this.data = {};

		this.refresh = function() {
			var that = this;

			$.get('hotels.json', function(data) {
				that.searchId = data[that.params.id];
				that.original = data[that.params.data];
				that.data = that.original.slice();
				that.setPage(0);
			});
		};

		this.setPage = function(num) {
			this.page.current = num;
			this.page.count = Math.floor(this.data.length / this.page.interval);
			this.element.currentPage.text(this.page.current + 1);
			this.element.totalPage.text(this.page.count + 1);
			this.display();
		};

		this.sort = function(by) {
			this.data.sort(function(a, b) {
				if (a[by] > b[by]) return 1;
				if (a[by] < b[by]) return -1;
				return 0;
			});

			this.setPage(0);
		};

		this.attachEvents = function() {
			var that = this;

			$('.sorter').on('click', function() {
				var el = $(this);

				$('.sorter').removeClass('sort');
				el.addClass('sort');

				that.sort(el.data('sort-by'));
			});


			/* Pagination */

			$('#page-nav-first').on('click', function() { that.setPage(0); });
			$('#page-nav-last').on('click', function() { that.setPage(that.page.count); });

			$('#page-nav-next').on('click', function() {
				if (that.page.current < that.page.count) {
					that.setPage(that.page.current + 1);
				}
			});

			$('#page-nav-back').on('click', function() {
				if (that.page.current > 0) {
					that.setPage(that.page.current + - 1);
				}
			});


			/* Filtering */

			$('#clear-filter').on('click', function() {
				that.data = that.original.slice();
				$('.sorter').removeClass('sort');
				that.setPage(0);
			});

			$('#apply-filter').on('click', function() {
				var filter = {
					name: $('#filter-name').val(),
					stars: $('#filter-stars').val(),
					urating: $('#filter-urating').val(),
					cost: $('#filter-cost').val()
				};

				if (filter.name !== '') {
					that.data = $.grep(that.data, function(d) {
						return d.Name.toLowerCase().indexOf(filter.name.toLowerCase()) > -1;
					});
				}

				if (filter.stars !== '') {
					that.data = $.grep(that.data, function(d) {
						return parseInt(d.Stars) >= parseInt(filter.stars);
					});
				}

				if (filter.urating !== '') {
					that.data = $.grep(that.data, function(d) {
						return parseFloat(d.UserRating) >= parseFloat(filter.urating);
					});
				}

				if (filter.cost !== '') {
					that.data = $.grep(that.data, function(d) {
						return parseFloat(d.MinCost) >= parseFloat(filter.cost);
					});
				}

				that.setPage(0);
			});
		};

		this.display = function() {
			var scope = {
				min: this.page.current * this.page.interval,
				max: (this.page.current * this.page.interval) + this.page.interval
			};

			var template = this.element.result.find('.template');
			this.element.result.html(template);

			for (var i = scope.min; (i < scope.max) && i < this.data.length; i++) {
				var row = template.clone();
				row.removeClass('hidden template');
				row.find('.image img').attr('src', this.data[i].ThumbnailUrl);
				row.find('.name').text(this.data[i].Name);
				row.find('.cost').html('&pound;' + this.data[i].MinCost.toFixed(2));
				row.find('.distance').text(this.data[i].Distance.toFixed(2));
				row.find('.type').text(this.data[i].EstablishmentType);
				row.find('.location').text(this.data[i].Location);
				row.find('.stars').html(Array(this.data[i].Stars + 1).join('&#9733;'));
				row.find('.urating').html(
					'<span class="main-figure">' + this.data[i].UserRating
					+ '</span> (' + this.data[i].UserRatingCount + ')')
					.attr('title', this.data[i].UserRatingTitle);

				this.element.result.append(row);
			};
		};

		this.attachEvents();
		this.refresh();
	};

	b.hotels = new Hotels();
})(window);
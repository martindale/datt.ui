import Ember from 'ember';

export default Ember.Service.extend({
  defaultCollective: '1NHy1SqQSeyEopKv3v1iTfx7sFdEiqocWb',

  getCollectiveThings: function(id) {
    return this.getCollective(id).then(function(collective) {
      return Ember.RSVP.hash({
        include: this.getListingsUnion(collective.include),
        exclude: this.getListingsUnion(collective.exclude)
      }).then(function(hash) {
        var ids = hash.include.slice();
        ids.removeObjects(hash.exclude);
        return ids;
      });
    }.bind(this)).then(this.getThings.bind(this));
  },

  getListingsUnion: function(ids) {
    return Ember.RSVP.all(ids.map(function(id) {
      return this.getListing(id).then(function(listing) {
        return listing.ids;
      });
    }.bind(this))).then(function(lists) {
      var result = [];
      lists.forEach(function(list) {
        result.addObjects(list);
      });
      return result;
    });
  },

  getCollective: function(id) {
    return this.getThing(id);
  },

  getListing: function(id) {
    return this.getThing(id);
  },

  getThings: function(ids) {
    return Ember.RSVP.all(ids.map(this.getThing.bind(this)));
  },

  getThing: function(id) {
    var thing = mocks.things[id];
    Ember.set(thing, 'id', id);
    return Ember.RSVP.resolve(thing);
  },

  getChildren: function(id) {
    return Ember.RSVP.resolve(things().filterProperty('parent', id));
  }
});


// Mocks
function things() {
  return Object.keys(mocks.things).map(function(id) {
    return mocks.things[id];
  });
}

// Note these addresses are random, do not send
var mocks = {
  stuff: { // content
  },

  things: { // metadata

    // Collectives

    '1NHy1SqQSeyEopKv3v1iTfx7sFdEiqocWb': {
      type: 'datt-collective',
      title: 'datt collectives',
      include: ['15BgKCtL2NLZmu6MbLVL1rwenKQ5V2kB4v'],
      balance: 0,
      created: 1438368806,
      exclude: []
    },

    '19A823btChtfS4MQBrj83NKiez2MP33rNC': {
      type: 'datt-collective',
      title: 'politics',
      balance: 2412,
      created: 1438403329,
      include: ['1EhuaosJVLy22jLh1NwYDGx4JjmD3gQ7gE'],
      exclude: ['1JpGxRHgkGoouVCRtY8zvMVvnhPMzDYuu3', '1JnPAMxaNNKdUWbWr38TxEUadHqbPgrbMS', '1PGmguDFjr9nnLEStVUvDZqUuEaaLWfZkA']
    },

    '14zAmN25ifTGhR641z8YkMBbcT1f1d4tb6': {
      type: 'datt-collective',
      title: 'politics - unmoderated',
      balance: 1421,
      created: 1438395985,
      include: ['1EhuaosJVLy22jLh1NwYDGx4JjmD3gQ7gE'],
      exclude: []
    },

    '1GyZKqHPsySXyTteRYnXogHw5XKKFqWke8': {
      type: 'datt-collective',
      title: 'politics w/o hitler',
      balance: 1811,
      created: 1438384539,
      include: ['1EhuaosJVLy22jLh1NwYDGx4JjmD3gQ7gE'],
      exclude: ['1JpGxRHgkGoouVCRtY8zvMVvnhPMzDYuu3', '1JnPAMxaNNKdUWbWr38TxEUadHqbPgrbMS']
    },

    // Listings

    '15BgKCtL2NLZmu6MbLVL1rwenKQ5V2kB4v': {
      type: 'datt-listing',
      title: 'collectives',
      balance: 0,
      created: 1438392902,
      ids: [
        '1NHy1SqQSeyEopKv3v1iTfx7sFdEiqocWb',
        '19A823btChtfS4MQBrj83NKiez2MP33rNC',
        '14zAmN25ifTGhR641z8YkMBbcT1f1d4tb6',
        '1GyZKqHPsySXyTteRYnXogHw5XKKFqWke8'
      ]
    },

    '1EhuaosJVLy22jLh1NwYDGx4JjmD3gQ7gE': {
      type: 'datt-listing',
      title: 'politics',
      balance: 0,
      created: 1438388557,
      ids: [
        '19KTMFNpNQPg2NV6FQuVKELJc48Xk1u9vA',
        '1Q7TRn5sxVdi7kvbjdGSXkvyBt8Hsabpmz',
        '1DLbks2Uz3epEBjuSiwriuVtVH9Kw4JQu8',
        '1DiHtqH2guBWx6uxgAzgPJXfDiP4dz8k8c'
      ]
    },

    '1JpGxRHgkGoouVCRtY8zvMVvnhPMzDYuu3': {
      type: 'datt-listing',
      title: 'go1dfish - offtopic politics',
      balance: 0,
      created: 1438382673,
      ids: [
        '1DLbks2Uz3epEBjuSiwriuVtVH9Kw4JQu8'
      ]
    },

    '1JnPAMxaNNKdUWbWr38TxEUadHqbPgrbMS': {
      type: 'datt-listing',
      title: 'ryanxcharles - offtopic politics',
      balance: 0,
      created: 1438395691,
      ids: [
        '1DiHtqH2guBWx6uxgAzgPJXfDiP4dz8k8c'
      ]
    },

    '1PGmguDFjr9nnLEStVUvDZqUuEaaLWfZkA': {
      type: 'datt-listing',
      title: 'hitler - offtopic politics',
      balance: 0,
      created: 1438380943,
      ids: [
        '1Q7TRn5sxVdi7kvbjdGSXkvyBt8Hsabpmz'
      ]
    },

    // Links

    '19KTMFNpNQPg2NV6FQuVKELJc48Xk1u9vA': {
      type: 'datt-link',
      title: 'The Downing Street Memo',
      body: 'http://www.downingstreetmemo.com/',
      balance: 6791,
      created: 1438379902
    },
    '1Q7TRn5sxVdi7kvbjdGSXkvyBt8Hsabpmz': {
      type: 'datt-link',
      title: 'Let us speak no more of faith in man, but bind him down from mischief by the chains of cryptography.',
      body: 'http://www.theatlantic.com/politics/archive/2014/05/edward-snowdens-other-motive-for-leaking/370068/',
      balance: 1776,
      created: 1438394868
    },

    '1DLbks2Uz3epEBjuSiwriuVtVH9Kw4JQu8': {
      type: 'datt-link',
      title: 'Rise up! Stand for what you believe in',
      body: 'http://viagra.com',
      balance: 42,
      created: 1438370939
    },

    '1DiHtqH2guBWx6uxgAzgPJXfDiP4dz8k8c': {
      type: 'datt-link',
      title: 'President Obama declares his intention to seek a third term',
      body: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      balance: 666,
      created: 1438376816
    }
  }
};

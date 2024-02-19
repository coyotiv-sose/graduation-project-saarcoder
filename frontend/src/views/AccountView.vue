<script>
import Listings from '@/components/Listings.vue'
import { useListingStore } from '../stores/listing'
import { useAuthenticationStore } from '@/stores/authentication'
import { mapState, mapActions } from 'pinia'
export default {
  components: {
    Listings
  },
  data() {
    return {
      name: '',
      country: '',
      region: '',
      place: '',
      numOfRooms: 0,
      numOfBedsInTotal: 0,
      numOfDoubleBeds: 0,
      cribOrCotAvailable: false,
      tv: false,
      underfloorHeating: false,
      laminateFlooring: false,
      stove: false,
      kitchen: false,
      dishwasher: false,
      microwave: false,
      coffeeMachine: false,
      toaster: false,
      kettle: false,
      fridge: false,
      freezer: false,
      oven: false,
      highChairAvailable: false,
      dryer: false,
      washingMachine: false,
      shower: false,
      bathtub: false,
      hairdryer: false,
      towels: false,
      warmWaterAvailable: false,
      bedLinen: false,
      iron: false,
      wifi: false,
      parking: false,
      newListingBasics: [],
      newListingAmenities: [],
    }
  },
  computed: {
    ...mapState(useListingStore, ['listing']),
    ...mapState(useAuthenticationStore, ['user']),
  },
  methods: {
    ...mapActions(useListingStore, ['fetchListings', 'createListing', 'updateListingName', 'updateListingOwner', 'updateRemainingListingProps','deleteListing']),

    async addListing(){
      const ownerId = this.user.data._id
      await this.createListing(this.newListingBasics[0], ownerId)
      //await this.updateRemainingListingProps(this.newListingAmenities[0])
      // this.$router.push('/')
    },
    saveAmenities(){
      this.newListingAmenities = []
      this.newListingAmenities.push({
        cribOrCotAvailable: this.cribOrCotAvailable,
        tv: this.tv,
        underfloorHeating: this.underfloorHeating,
        laminateFlooring: this.laminateFlooring,
        stove: this.stove,
        kitchen: this.kitchen,
        dishwasher: this.dishwasher,
        microwave: this.microwave,
        coffeeMachine: this.coffeeMachine,
        toaster: this.toaster,
        kettle: this.kettle,
        fridge: this.fridge,
        freezer: this.freezer,
        oven: this.oven,
        highChairAvailable: this.highChairAvailable,
        dryer: this.dryer,
        washingMachine: this.washingMachine,
        shower: this.shower,
        bathtub: this.bathtub,
        hairdryer: this.hairdryer,
        towels: this.towels,
        warmWaterAvailable: this.warmWaterAvailable,
        bedLinen: this.bedLinen,
        iron: this.iron,
        wifi: this.wifi,
        parking: this.parking
      })
    },
    saveBasics(){
      this.newListingBasics = []
      this.newListingBasics.push({
        name: this.name,
        country: this.country,
        region: this.region,
        place: this.place,
        numOfRooms: this.numOfRooms,
        numOfBedsInTotal: this.numOfBedsInTotal,
        numOfDoubleBeds: this.numOfDoubleBeds,
      })
    },
  }
}
</script>

<template>
    <h1 class="greeting">Manage your account and listings</h1>
    <Listings />

    <!-- Add listing -->
    <div class="add-item-form">
      <h2>Add a listing</h2>
      <input @keyup.enter="saveItem" v-model.lazy="name" type="text" placeholder="Name" required />
      <input @keyup.enter="saveItem" v-model.lazy="country" type="text" placeholder="Country" required />
      <input @keyup.enter="saveItem" v-model.lazy="region" type="text" placeholder="Region" required />
      <input @keyup.enter="saveItem" v-model.lazy="place" type="text" placeholder="Place" required />
      <label><input v-model.number="numOfRooms" type="number" min="1" required />Room(s)</label>
      <label><input v-model.number="numOfBedsInTotal" type="number" min="1" required />Bed(s)</label>
      <label><input v-model.number="numOfDoubleBeds" type="number" required />Double bed(s)</label>
      <button @click="saveBasics" class="btn btn-success btn-sm">Add basic listing data</button>

      <div class="amenities">
      <h3>Choose your available amenities from list</h3>
      <label><input type="checkbox" v-model="cribOrCotAvailable" value="crib or cot">Crib or Cot</label>
      <label><input type="checkbox" v-model="tv" value="tv">TV</label>
      <label><input type="checkbox" v-model="underfloorHeating" value="underfloorHeating">Floor Heating</label>
      <label><input type="checkbox" v-model="laminateFlooring" value="laminateFlooring">Laminate flooring</label>
      <label><input type="checkbox" v-model="tv" value="stove">Stove</label>
      <label><input type="checkbox" v-model="kitchen" value="kitchen">Kitchen</label>
      <label><input type="checkbox" v-model="dishwasher" value="dishwasher">Dishwasher</label>
      <label><input type="checkbox" v-model="microwave" value="microwave">Microwave</label>
      <label><input type="checkbox" v-model="coffeeMachine" value="coffee machine">Coffee Machine</label>
      <label><input type="checkbox" v-model="toaster" value="toaster">Toaster</label>
      <label><input type="checkbox" v-model="kettle" value="kettle">Kettle</label>
      <label><input type="checkbox" v-model="fridge" value="fridge">Fridge</label>
      <label><input type="checkbox" v-model="freezer" value="freezer">Freezer</label>
      <label><input type="checkbox" v-model="oven" value="oven">Oven</label>
      <label><input type="checkbox" v-model="highChairAvailable" value="high chair">High chair</label>
      <label><input type="checkbox" v-model="dryer" value="dryer">Dryer</label>
      <label><input type="checkbox" v-model="washingMachine" value="washing machine">Washing machine</label>
      <label><input type="checkbox" v-model="shower" value="shower">Shower</label>
      <label><input type="checkbox" v-model="bathtub" value="bathtub">Bathtub</label>
      <label><input type="checkbox" v-model="hairdryer" value="hairdryer">Hairdryer</label>
      <label><input type="checkbox" v-model="towels" value="towels">Towels</label>
      <label><input type="checkbox" v-model="warmWaterAvailable" value="warm water">Warm water</label>
      <label><input type="checkbox" v-model="bedLinen" value="bed linen">Linen</label>
      <label><input type="checkbox" v-model="iron" value="iron">Iron</label>
      <label><input type="checkbox" v-model="wifi" value="wifi">Wifi</label>
      <label><input type="checkbox" v-model="parking" value="parking">Parking</label>
      </div>
      <br>
      <button @click="saveAmenities" class="btn btn-success btn-sm">Add your amenities</button>
      <button @click="addListing" class="btn btn-success btn-sm ms-2">Add listing</button>
    </div>

</template>

<style>
label {
  margin-right: 1rem;
}
button {
  margin-top: 1rem;
}
input {
  margin-bottom: .5rem;
}
input[type="number"] {
  width: 2.25rem;
  margin-right: .5rem;
}
input[type="text"] {
  margin-right: 2rem;
}
input[type="checkbox"] {
  margin-right: .35rem;
}
.amenities {
  margin-top: 1rem;
}
  @media screen and (max-width: 1024px){
    .greeting {
      display: flex;
      justify-content: center;
    }
  }
</style>

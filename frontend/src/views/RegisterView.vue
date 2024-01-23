<script>
import axios from 'axios'
export default {
  name: 'RegisterView',
  components: {},
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async register() {
      const newUser = await axios.post(
        'http://localhost:3000/authentication/register',
        {
          email: this.email,
          password: this.password
        },
        {
          withCredentials: true
        }
      )
      if (newUser) {
        this.user = newUser.data
        this.status = 'success'
      } else {
        this.user = {}
        this.status = 'failed'
      }
      console.log(newUser.data)
    }
  }
}

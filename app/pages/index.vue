<script setup lang="ts">
import { navigateTo } from '#app';

navigateTo({name:'chardetails', params: { bannerIndex: 0 }}, { redirectCode: 301 });
</script>
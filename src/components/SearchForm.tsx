import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form"
import { useSearchParams } from 'next/navigation'

type FormValues = {
  id: string;
}

const SearchForm = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id") || "";

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      id: id ? id : "",
    }
  })

  const router = useRouter();

  const onSubmit = (data: FormValues) => {
    if (data.id) {
      router.push(`?id=${encodeURIComponent(data.id)}`);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="id"
        control={control}
        render={({ field }) => {
          return (
            <TextField {...field} label="idを入力" variant="outlined" fullWidth />
          )
        }}
      />

      <Button type="submit" variant="contained" color="primary">
        検索
      </Button>
    </form>
  )
}

export default SearchForm

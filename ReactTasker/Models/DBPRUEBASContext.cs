using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ReactTasker.Models
{
    public partial class DBPRUEBASContext : DbContext
    {
        public DBPRUEBASContext()
        {
        }

        public DBPRUEBASContext(DbContextOptions<DBPRUEBASContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Tarea> Tareas { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
            optionsBuilder.UseSqlServer("Server=DBTAREAS.mssql.somee.com; DataBase=DBTAREAS; user id=franco_SQLLogin_1;pwd=jbcvg9unif");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<Tarea>(entity =>
            {
                entity.HasKey(e => e.IdTarea)
                    .HasName("PK__Tarea__EADE9098FBB9A461");

                entity.ToTable("Tarea");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FechaRegistro)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
